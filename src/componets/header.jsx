import {
    Authenticator,
    Button,
    Text,
  } from "@aws-amplify/ui-react";
  import { getCurrentUser } from "aws-amplify/auth";

const {username} = await getCurrentUser();

function Header(){
    return (
        <header>
            <Authenticator >
            {({ signOut, user}) => (
                <div>
                    <Text>Welcome {user.name}, {username}</Text>
                    <Button onClick={signOut}>Sign Out</Button>
                    
                </div>
            )}  
            </Authenticator>
        </header>
    );
}

export default Header;
