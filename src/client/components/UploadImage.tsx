import React, {useRef} from "react";

export const UploadImage = () => {
    const inputFolder = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                // Access file information
                console.log('File Type:', files[i].type);
                try {
                    // Check if the file is an image (you may want to use a more comprehensive check)
                    if (files[i].type.startsWith('image/')) {
                        // Read the contents of the image file using FileReader
                        const reader = new FileReader();

                        reader.onload = (e) => {
                            // e.target.result contains the base64-encoded image data
                            const imageDataUrl = e.target?.result as string;

                            // Create an image element for preview
                            const image = new Image();
                            image.src = imageDataUrl;
                            image.style.maxWidth = '1000px'; // Set the maximum width for the preview

                            // Append the image to the document or display it in your UI
                            document.body.appendChild(image);

                        };

                        // Read the content of the current file as a data URL
                        reader.readAsDataURL(files[i]);
                    }

                }
                catch (err) {
                    console.error(err)
                }
            }

            // If you want to access the folder name, you can use the webkitRelativePath property
            if (files[0].webkitRelativePath) {
                const folderName = files[0].webkitRelativePath.split('/')[0];
                console.log('Folder Name:', folderName);
                // If end with .jpg then open the file
            }
        }
    };

    return (
        <input
            type="file"
            onChange={handleFileChange}
            ref={(node) => {
                inputFolder.current = node;

                if (node) {
                    ['webkitdirectory', 'directory', 'mozdirectory'].forEach((attr) => {
                        node.setAttribute(attr, '');
                    });
                }
            }}
        />
    );
};

export default UploadImage;