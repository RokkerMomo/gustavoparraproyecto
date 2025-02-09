'use server'
import { Vimeo } from "vimeo";

let client = new Vimeo("1b1ad06c540f3a4faa567f68f013749aa36c3486", "H/K+8oyYiMRANuebFFiyUQp/A5gBa0EH1uhtAaIDCL4b5qiHovXXb8oNRApzZh06sMQzL53XIkNi8dDbBJ9ul7wJ/Iiii6zVbX/XDNfmUbsRkNm/MiFIPxBsLODSPIb2", "f2e3766a4980ffc819915beb0addecf6");


export async function upload(filename, name, description) {
    let file_name = filename
    client.upload(
        file_name,
        {
            'name': name,
            'description': description
        },
        function (uri) {
            console.log('Your video URI is: ' + uri);
        },
        function (bytes_uploaded, bytes_total) {
            var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
            console.log(bytes_uploaded, bytes_total, percentage + '%')
        },
        function (error) {
            console.log('Failed because: ' + error)
        }
    )
}
