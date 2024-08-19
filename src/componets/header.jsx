import {
    Authenticator,
    Button,
    Text,
  } from "@aws-amplify/ui-react";
  import { fetchUserAttributes } from 'aws-amplify/auth';

const user = fetchUserAttributes();
console.log(user)
function Header(){
    return (
        <header>
            <Authenticator >
            {({ signOut}) => (
                <div>
                    <Text>Welcome</Text>
                    <Button onClick={signOut}>Sign Out</Button>
                    console.log(user);
                </div>
            )}  
            </Authenticator>
        </header>
    );
}

export default Header;
