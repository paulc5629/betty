import {
    Authenticator,
    Button,
    Text,
  } from "@aws-amplify/ui-react";
  
  import outputs from "../amplify_outputs.json";

function Header(){
    return (
        <header>
            <Authenticator >
            {({ signOut }) => (
                <div>
                    <Text>Welcome, {outputs.cognitoUserPool.DefaultClientSecretUsername}</Text>
                    <Button onClick={signOut}>Sign Out</Button>
                </div>
            )}  
            </Authenticator>
        </header>
    );
}

export default Header;
