import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { storage } from "./firebase"
import sharp from "sharp"

export async function uploadFile (file) {

    console.log(file);

    console.log("pase por uploadFile");

    let fileBuffer = await sharp (file.buffer).resize({width: 200, height: 200, fit: "cover"}).toBuffer()

    const fileRef = ref(storage, `files/${file.originalname} ${Date.now()}`)

    const fileMetaData = {
        contentType : file.mimetype
    }

    const fiileUploadPromise = uploadBytesResumable(
        fileRef,
        fileBuffer,
        fileMetaData
    )

    await fiileUploadPromise

    const fileDownloadURL = await getDownloadURL(fileRef);

    return { ref: fileRef, downloadUrl: fileDownloadURL };
}
 