import {
    Authenticator,
    Button,
    Text,
  } from "@aws-amplify/ui-react";




function Header(){
    return (
        <header>
            <Authenticator >
            {({ signOut, user}) => (
                <div>
                    <Text>Welcome, {user?.name}</Text>
                    <Button onClick={signOut}>Sign Out</Button>
                </div>
            )}  
            </Authenticator>
        </header>
    );
}

export default Header;
