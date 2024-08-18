import {
    Authenticator,
    Button,
    Text,
  } from "@aws-amplify/ui-react";
  import { getCurrentUser } from "aws-amplify/auth";

  const { username } = getCurrentUser();


function Header(){
    return (
        <header>
            <Authenticator >
            {({ signOut,}) => (
                <div>
                    <Text>Welcome, {username}</Text>
                    <Button onClick={signOut}>Sign Out</Button>
                </div>
            )}  
            </Authenticator>
        </header>
    );
}

export default Header;
