import {
    Authenticator,
    Button,
    Text,
  } from "@aws-amplify/ui-react";
  import Amplify from "aws-amplify";
  
  import outputs from "../../amplify_outputs.json";

  Amplify.configure(outputs);



function Header(){
    return (
        <header>
            <Authenticator >
            {({ signOut, user}) => (
                <div>
                    <Text>Welcome, {user?.username}</Text>
                    <Button onClick={signOut}>Sign Out</Button>
                </div>
            )}  
            </Authenticator>
        </header>
    );
}

export default Header;
