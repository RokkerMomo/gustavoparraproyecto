import { writeFile } from 'fs/promises'
import { join } from 'path'
import { upload } from '../../actions/vimeosdk';
import axios from 'axios';
export default function ServerUploadPage({
  params,
  searchParams,
}) {
  async function uploadA(data) {
    'use server'

    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Yjc3NzZkZmY1MGNjODhlNzNjZWNiZCIsInVzdWFyaW8iOiJ0aGVmZXI3NjdAZ21haWwuY29tIiwiaWF0IjoxNzQwNTgwMTgzLCJleHAiOjE3NDA2NjY1ODN9.p_JDKsbrfqgoKdmo6QVO_BH9ljKy1nQXMpLIaqQMZCY` }
    };


    const file = data.get('file')
    const desc = data.get('desc')
    if (!file) {
      throw new Error('No file uploaded')
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = join('/', 'tmp', file.name)
    await writeFile(path, buffer)
    
    console.log(`open ${path} to see the uploaded file`)

    try {
        // Upload the file
        const { uri, hash } = await upload(path, file.name, 'description');
        console.log(uri);

        // Extract the video ID from the URI
        const videoIdMatch = uri.match(/\/videos\/(\d+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if (!videoId) {
            throw new Error('Failed to extract video ID from URI');
        }

        console.log(`Video ID: ${videoId}`);
        console.log(`Hash: ${hash}`);
        console.log(`Description: ${desc}`);

        const newDate = new Date();
        const formattedDate = newDate.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-');

        // Log the request data
        const requestData = {
            id_grade: searchParams?.id,
            desc: desc,
            date: formattedDate,
            url_vid: `${videoId}?h=${hash}`
        };
        console.log('Request Data:', requestData);

        // Make the axios request after the upload is complete
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/createClass`, requestData, config);

        console.log('Response:', response);

        // Use the unlink method to delete the file
        // await unlink(path);
        // console.log(`${path} has been deleted`);

        return JSON.stringify({ success: true });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return JSON.stringify({ success: false, error: error.message });
    }
  }

  return (
    <main>
      <h1>React Server Component: Upload</h1>
      <form action={uploadA}>
        <input type="file" name="file" />
        <input placeholder={searchParams?.id} name='desc'></input>
        <input type="submit" value="Upload" />
      </form>
    </main>
  )
}