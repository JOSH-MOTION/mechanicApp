import { Client,Account,ID, Avatars,Databases, Query, Storage } from 'react-native-appwrite';
import { Platform } from 'react-native';
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
           // Fetch and return updated user data after successful login
    const userData = await getCurrentUser();
    return { session, userData }; // Return both session and user data

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

  // Updated registerMechanic function
  export const registerMechanic = async (mechanicname, mechanicEmail, mechanicId, latitude, longitude, contact, specialization, imageUri) => {
    try {
        // Upload the image and get the URL
        const imageUrl = await uploadImage(imageUri);

        const newMechanicId = ID.unique();
        const mechanic = await databases.createDocument(
            config.databaseId,
            config.mechaniccollectionId,
            newMechanicId,
            {
                mechanicname: mechanicname,
                mechanic_email: mechanicEmail,
                mechanicid: mechanicId,
                latitude: latitude,
                longitude: longitude,
                contact: contact,
                specialization: specialization,
                image: imageUrl,
            }
        );
        return mechanic;
    } catch (error) {
        console.error("Error registering mechanic:", error);
        throw new Error('Failed to register mechanic');
    }
};

// Function to upload image
const uploadImage = async (fileUri) => {
    try {
        let file;
        if (Platform.OS === 'web') {
            file = fileUri; // Directly use the file URI on web
        } else {
            const response = await fetch(fileUri);
            file = await response.blob(); // Convert URI to blob for native
        }

        const fileId = ID.unique();
        const uploadedFile = await storage.createFile(config.storageId, fileId, file);
        const imageUrl = storage.getFileView(config.storageId, uploadedFile.$id);

        return imageUrl; // Return the URL of the uploaded image
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Could not upload image');
    }
};

export const logout = async () => {
    try {
        await account.deleteSession('current'); // Ensure this line is correct for deleting the current session
    } catch (error) {
        throw new Error('Failed to logout'); // Handle error properly
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

// Function to handle image picking and updating avatar
const pickImageAndUploadAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access the camera roll is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync();
  
    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri; // Get the selected image URI
  
      try {
        const avatarUrl = await uploadAvatar(selectedImageUri); // Upload new avatar and get URL
        setImage(avatarUrl); // Update local state with new avatar URL
  
        // Optionally update local user state with the new avatar
        const currentUser = await getCurrentUser();
        currentUser.avatar = avatarUrl; // Update local user data with new avatar
        setUser(currentUser); // Update state to reflect changes
      } catch (error) {
        console.error('Error updating avatar:', error);
      }
    }
  };
  