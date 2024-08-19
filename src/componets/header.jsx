import {
    Authenticator,
    Button,
    Text,
  } from "@aws-amplify/ui-react";
  import { fetchUserAttributes } from "@aws-amplify/auth";


  const printUserAttributes = async () => {
    try {
      const userAttributes = await fetchUserAttributes();
      console.log('Email:', userAttributes.email);
    }
    catch (e) { console.log(e); }
  };
  console.log('User attributes:', printUserAttributes.email);

function Header(){
    return (
        <header>
            <Authenticator >
            {({ signOut, user}) => (
                <div>
                    <Text>Welcome {user?.username}</Text>
                    <Button onClick={signOut}>Sign Out</Button>
                    
                </div>
            )}  
            </Authenticator>
        </header>
    );
}

export default Header;
