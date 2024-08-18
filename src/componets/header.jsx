import {
    Authenticator,
    Button,
    Text,
  } from "@aws-amplify/ui-react";
  import { getCurrentUser } from "aws-amplify/auth";

const email = getCurrentUser();


function Header(){
    return (
        <header>
            <Authenticator >
            {({ signOut,}) => (
                <div>
                    <Text>Welcome, {email}</Text>
                    <Button onClick={signOut}>Sign Out</Button>
                </div>
            )}  
            </Authenticator>
        </header>
    );
}

export default Header;
