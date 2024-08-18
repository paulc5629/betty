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
                    <Text>Welcome, {user?.username}</Text>
                    <Button onClick={signOut}>Sign Out</Button>
                    console.log(user);
                </div>
            )}  
            </Authenticator>
        </header>
    );
}

export default Header;
