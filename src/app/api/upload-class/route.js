import { writeFile, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { upload } from '../../../actions/vimeosdk';
import axios from 'axios';
import { date } from 'zod';

export async function POST(request) {
    const data = await request.formData();
    const file = data.get('file');
    const id_grade = data.get('id_grade');
    const desc = data.get('desc');
    const date = data.get('date');
    const token = data.get('token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    if (!file) {
        return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write the file to the filesystem
    const path = `/tmp/${file.name}`;
    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);

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

        // Log the request data
        const requestData = {
            id_grade: id_grade,
            desc: desc,
            date: date,
            url_vid: `${videoId}?h=${hash}`
        };
        console.log('Request Data:', requestData);

        // Make the axios request after the upload is complete
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/createClass`, requestData, config);

        console.log('Response:', response);

        // Use the unlink method to delete the file
        // await unlink(path);
        // console.log(`${path} has been deleted`);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return NextResponse.json({ success: false, error: error.message });
    }
}