import {
    Authenticator,
    Button,
    Text,
  } from "@aws-amplify/ui-react";



function Header(){
    return (
        <header>
            <Authenticator >
            {({ signOut}) => (
                <div>
                    <Text>Welcome </Text>
                    <Button onClick={signOut}>Sign Out</Button>
                </div>
            )}  
            </Authenticator>
        </header>
    );
}

export default Header;
