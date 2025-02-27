'use server'
import { Vimeo } from "vimeo";
import { unlink } from 'fs/promises';
import fs, { writeFile } from 'fs/promises';
import path from 'path';
import axios from "axios";

let client = new Vimeo(process.env.NEXT_PUBLIC_VIMEO_CLIENT, process.env.NEXT_PUBLIC_VIMEO_TOKEN, process.env.NEXT_PUBLIC_VIMEO_SECRET);

export async function upload(filename, name, description) {
    return new Promise((resolve, reject) => {
        client.upload(
            filename,
            {
                'name': name,
                'description': description,
                'privacy': {
                    'view': 'unlisted' // Set the privacy to unlisted
                }
            },
            async function (uri) {
                console.log('Your video URI is: ' + uri);
                await unlink(filename);
                console.log(`${filename} has been deleted`);

                // Extract the video ID from the URI
                const videoIdMatch = uri.match(/\/videos\/(\d+)/);
                const videoId = videoIdMatch ? videoIdMatch[1] : null;

                if (!videoId) {
                    return reject(new Error('Failed to extract video ID from URI'));
                }

                // Make an API call to get the video details
                client.request({
                    method: 'GET',
                    path: `/videos/${videoId}`
                }, function (error, body, statusCode, headers) {
                    if (error) {
                        return reject(error);
                    }

                    console.log('Video details:', body); // Log the response body to inspect its structure

                    // Extract the hash from the response body
                    const linkMatch = body.link.match(/\/(\w+)$/);
                    const hash = linkMatch ? linkMatch[1] : null;

                    if (!hash) {
                        return reject(new Error('Failed to extract hash from video details'));
                    }

                    resolve({ uri, hash }); // Resolve the Promise with the URI and hash
                });
            },
            function (bytes_uploaded, bytes_total) {
                var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2);
                console.log(bytes_uploaded, bytes_total, percentage + '%');
            },
            function (error) {
                console.log('Failed because: ' + error);
                reject(error); // Reject the Promise with the error
            }
        );
    });
}

export async function replaceVideo(videoId, filename) {
    console.log(videoId);
    console.log(filename);

    // Remove the hash from the videoId
    const cleanVideoId = videoId.split('?')[0];
    console.log('Clean video ID:', cleanVideoId);

    // Resolve the absolute path of the file
    const absolutePath = path.resolve(filename);
    console.log('Absolute path:', absolutePath);

    // Check if the file exists
    if (!fs.existsSync(absolutePath)) {
        console.error('File does not exist:', absolutePath);
        throw new Error('File does not exist');
    }

    return new Promise((resolve, reject) => {
        client.replace(
            absolutePath,
            `/videos/${cleanVideoId}`,
            async function (uri) {
                console.log('Your video has been replaced. New URI is: ' + uri);
                await unlink(absolutePath);
                console.log(`${absolutePath} has been deleted`);

                // Extract the video ID from the URI
                const videoIdMatch = uri.match(/\/videos\/(\d+)/);
                const newVideoId = videoIdMatch ? videoIdMatch[1] : null;

                if (!newVideoId) {
                    return reject(new Error('Failed to extract new video ID from URI'));
                }

                // Make an API call to get the video details
                client.request({
                    method: 'GET',
                    path: `/videos/${newVideoId}`
                }, function (error, body, statusCode, headers) {
                    if (error) {
                        return reject(error);
                    }

                    console.log('Video details:', body); // Log the response body to inspect its structure

                    // Extract the hash from the response body
                    const linkMatch = body.link.match(/\/(\w+)$/);
                    const hash = linkMatch ? linkMatch[1] : null;

                    if (!hash) {
                        return reject(new Error('Failed to extract hash from video details'));
                    }

                    resolve({ uri, hash }); // Resolve the Promise with the URI and hash
                });
            },
            function (bytes_uploaded, bytes_total) {
                var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2);
                console.log(bytes_uploaded, bytes_total, percentage + '%');
            },
            function (error) {
                console.log('Failed because: ' + error);
                reject(error); // Reject the Promise with the error
            }
        );
    });
}


export async function deleteVideo(videoId) {
    console.log('Deleting video ID:', videoId);

    // Remove the hash from the videoId
    const cleanVideoId = typeof videoId === 'string' ? videoId.split('?')[0] : videoId;
    console.log('Clean video ID:', cleanVideoId);

    // Encode the video ID to ensure it is properly formatted for the URL
    const encodedVideoId = encodeURIComponent(cleanVideoId);
    console.log('Encoded video ID:', encodedVideoId);

    return new Promise((resolve, reject) => {
        client.request({
            method: 'DELETE',
            path: `/videos/${encodedVideoId}`
        }, function (error, body, statusCode, headers) {
            if (error) {
                console.log('Failed to delete video:', error);
                return reject(error);
            }

            console.log('Video deleted successfully');
            resolve({ msg: 'Video deleted successfully' });
        });
    });
}

export async function PrepareVideotoUpload(file,id_grade,desc,token,date) {

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    if (!file) {
        return null
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

        return JSON.stringify({ success: true });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return JSON.stringify({ success: false, error: error.message });
    }

}