import { Client,Account,ID, Avatars,Databases, Query, Storage } from 'react-native-appwrite';
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
const storage = new Storage(client);

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



    // Function to upload avatar
export const uploadAvatar = async (fileUri, userId) => {
    try {
      // Get the file as a blob for upload (depending on the platform)
      let file;
      if (Platform.OS === 'web') {
        file = fileUri; // On web, it's already a file
      } else {
        const response = await fetch(fileUri);
        file = await response.blob(); // On native platforms, convert the URI to a blob
      }
  
      // Upload file to Appwrite Storage
      const fileId = ID.unique();
      const uploadedFile = await storage.createFile(config.storageId, fileId, file);
  
      // Get the public URL to access the avatar
      const avatarUrl = storage.getFileView(config.storageId, uploadedFile.$id);
  
      // Update user's avatar in the database
      const currentUser = await getCurrentUser(); // Get the logged-in user
      await databases.updateDocument(
        config.databaseId,
        config.userCollectionId,
        currentUser.$id, // Assuming this returns the document id
        { avatar: avatarUrl } // Update the avatar field with the new URL
      );
  
      return avatarUrl; // Return the URL for the avatar
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw new Error('Could not upload avatar');
    }
  };

  export const registerMechanic = async (name, location, contact,mechanicEmail) => {
    try {
        const mechanic = await databases.createDocument(
            config.databaseId,
            config.mechaniccollectionId,
            ID.unique(),
            {   mechanic_email: mechanicEmail,
                name: name,
                location: location, // Store latitude and longitude
                contact: contact,
            }
        );
        return mechanic;
    } catch (error) {
        console.error("Error registering mechanic:", error);
        throw new Error('Failed to register mechanic');
    }
};


export const getMechanics = async () => {
    try {
        const mechanics = await databases.listDocuments(
            config.databaseId,
            config.mechaniccollectionId
        );
        return mechanics.documents;
    } catch (error) {
        console.error("Error fetching mechanics:", error);
        throw new Error('Failed to fetch mechanics');
    }
};
