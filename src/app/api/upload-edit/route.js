import { writeFile, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { replaceVideo } from '../../../actions/vimeosdk';
import axios from 'axios';

export async function POST(request) {
  const data = await request.formData();
  const id = data.get('id');
  const file = data.get('file');
  const name = data.get('name');
  const desc = data.get('desc');
  const price = data.get('price');
  const slogan = data.get('slogan');
  const urlpic = data.get('urlpic');
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
    const { uri, hash } = await replaceVideo(id,path);
    console.log(uri);

    // Extract the video ID from the URI
    const videoIdMatch = uri.match(/\/videos\/(\d+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      throw new Error('Failed to extract video ID from URI');
    }

    console.log(`Video ID: ${videoId}`);
    console.log(`Hash: ${hash}`);
    console.log(`Name: ${name}`);
    console.log(`Description: ${desc}`);
    console.log(`Price: ${price}`);
    console.log(`Slogan: ${slogan}`);
    console.log(`URL: ${urlpic}`);

    // Log the request data
    const requestData = {
      name: name,
      desc: desc,
      slogan: slogan,
      price: price,
      url_pic: urlpic,
      vidId: `${videoId}?h=${hash}`
    };
    console.log('Request Data:', requestData);

    // Make the axios request after the upload is complete
    // const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/NewGrade`, requestData, config);

    // console.log('Response:', response);

    // Use the unlink method to delete the file
    // await unlink(path);
    // console.log(`${path} has been deleted`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}