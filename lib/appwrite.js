import { Client,Account,ID, Avatars,Databases, Query  } from 'react-native-appwrite';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: "com.wik.mechanic",
    projectId: "66ed62870009e6f6aad4",
    databaseId:"66ed650e000e6e6054b6",
    userCollectionId:"66ed655200197a1885d8",
    mechaniccollectionId: "66ed6598002cba328e16",
    storageId: "66ed67bd0028c165ff88"
}



// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 


    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client)

    export const createUser = async (email,password,username) => {
      try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email,password)

       const newUser= await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        
        {
            accountid: newAccount.$id,
            email,
            username,
            avatar: avatarUrl,
           
        }
       )
       return newUser;

      }catch (error) {
        console.log(error);
        throw new Error(error)
      }

    }
    
    export const signIn = async(email,password) => {        
         try{
            const session = await account.createEmailPasswordSession (email,password)
            
            return session;

        } catch(error) {
                throw new Error (error);
        }
    }

    export const getCurrentUser = async () => {
        try{
            const currentAccount = await account.get();
            if (!currentAccount) throw Error;

            const currentUser = await databases.listDocuments(
                config.databaseId,
                config.userCollectionId,
                [Query.equal('accountid' , currentAccount.$id)]
            )

            if (!currentUser) throw Error 

            return currentUser.documents[0];
        }catch (error){
            console.log(error)
        }
    }
