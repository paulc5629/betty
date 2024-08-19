import {
    Authenticator,
    Button,
    Text,
  } from "@aws-amplify/ui-react";
import { getCurrentUser } from "aws-amplify/auth";

const {username, signInDetails} = await getCurrentUser();
function Header(){
    return (
        <header>
            <Authenticator >
            {({ signOut}) => (
                <div>
                    <Text>Welcome {username}, {signInDetails}</Text>
                    <Button onClick={signOut}>Sign Out</Button>
                    
                </div>
            )}  
            </Authenticator>
        </header>
    );
}

export default Header;
