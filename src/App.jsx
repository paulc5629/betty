import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  Text,
  TextField,
  Heading,
  Flex,
  View,
  Image,
  Grid,
  Divider,
  SelectField,
  SliderField,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { getUrl, uploadData} from "aws-amplify/storage";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import { fetchUserAttributes } from '@aws-amplify/auth';




Amplify.configure(outputs);


import Header from "./componets/header";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function App() {
  const [notes, setNotes] = useState([]);

  const printUserAttributes =( async () => {
    try {
      const userAttributes = await fetchUserAttributes();
      document.getElementById("welcomeUser").innerHTML = "Welcome, " + userAttributes.email;
    }
    catch (e) { console.log(e); }
  })();
  


  useEffect(() => {
    fetchNotes();
  }, []);
  
  async function fetchNotes() {
    const { data: notes } = await client.models.Note.list();
    await Promise.all(
      notes.map(async (note) => {
        if (note.image) {
          const linkToStorageFile = await getUrl({
            path: ({ identityId }) => `media/${identityId}/${note.image}`,
          });
          console.log(linkToStorageFile.url);
          note.image = linkToStorageFile.url;
        }
        return note;
      })
    );
    console.log(notes);
    setNotes(notes);
    printUserAttributes;
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    console.log(form.get("image").name);

    const { data: newNote } = await client.models.Note.create({
      name: form.get("name"),
      description: form.get("description"),
      battery: form.get("battery"),
      image: form.get("image").name,
    });

    console.log(newNote);
    if (newNote.image)
      if (newNote.image)
        await uploadData({
          path: ({ identityId }) => `media/${identityId}/${newNote.image}`,

          data: form.get("image"),
        }).result;

    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const toBeDeletedNote = {
      id: id,
    };

    const { data: deletedNote } = await client.models.Note.delete(
      toBeDeletedNote
    );
    console.log(deletedNote);

    fetchNotes();
  }




  return (
    <Authenticator>
      {({ signOut}) => (
        <Flex
          className="App"
          justifyContent="center"
          alignItems="center"
          direction="column"
          width="100%"
          margin="0 auto"
        >
          <Header />
          <Heading level={1} id="welcomeUser"></Heading>
          <View as="form" margin="3rem 0" onSubmit={createNote}>
            <Flex
              direction="column"
              justifyContent="center"
              gap="2rem"
              padding="2rem"
            >
            <SelectField label="Food" name="name"
              descriptiveText="Select Option">
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack before bed">Before Bed Snack</option>
              <option value="snack any time">Snack</option>
            </SelectField>
              <TextField
                name="description"
                placeholder="Record Note's"
                label="Record Note's"
                labelHidden
                variation="quiet"
              />
              <SliderField
                label="Battery Level"
                name="battery"
                min={0}
                max={100}
                step={5}
                defaultValue={50}
              />
              <View
                  name="image"
                  as="input"
                  type="file"
                  alignSelf={"end"}
                  accept="image/png, image/jpeg"
                />

              <Button type="submit" variation="primary">
                Save Record
              </Button>
            </Flex>
          </View>
          <Divider />
          <Heading level={2}>Meal Details</Heading>
          <Grid
            margin="3rem 0"
            autoFlow="column"
            justifyContent="center"
            gap="2rem"
            alignContent="center"
          >
            {notes.map((note) => (
              <Flex
                key={note.id || note.name}
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap="2rem"
                border="1px solid #ccc"
                padding="2rem"
                borderRadius="5%"
                className="box"
              >
                <View>
                  <Heading level="3">{note.name}</Heading>
                </View>
                <Text fontStyle="italic">{note.description}</Text>
                <Text fontStyle="italic">{note.battery}</Text>
                {note.image && (
                  <Image
                    src={note.image}
                    alt={`visual aid for ${notes.name}`}
                    style={{ width: 400 }}
                  />
                )}
                <Button
                  variation="destructive"
                  onClick={() => deleteNote(note)}
                >
                  Delete note
                </Button>
              </Flex>
            ))}
          </Grid>
          <Button onClick={signOut}>Sign Out</Button>
          
        </Flex>
      )}
    </Authenticator>
  );
}