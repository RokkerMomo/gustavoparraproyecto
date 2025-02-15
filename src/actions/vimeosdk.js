'use server'
import { Vimeo } from "vimeo";
import { unlink } from 'fs/promises';

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