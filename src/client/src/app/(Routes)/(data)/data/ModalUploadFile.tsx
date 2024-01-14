import React from 'react';

interface ModalUploadFileProps {
    folder: Folder;
    onClose: () => void;
}

interface ImageObject {
    name: string;
    url: string;
}

interface Folder {
    name: string;
    subfolders?: Folder[];
    images?: ImageObject[];
}


const ModalUploadFile: React.FC<ModalUploadFileProps> = ({ folder, onClose }) => {
    const modalBoxStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    //debug
    if (folder.subfolders) {
        folder.subfolders.forEach((subfolder, index) => {
            console.log(`Subfolder ${index} - Name: ${subfolder.name}`);
            console.log(`Subfolder ${index} - Image Objects: ${subfolder.images}`);

            if (subfolder.images) {
                console.log("bruhhh")
                subfolder.images.slice(0, 10).forEach((images, imgIndex) => {
                    console.log(`URL for image ${imgIndex}: ${images.url}`);
                });
            }
        });
    }

    return (
        <div role="dialog" style={modalBoxStyle}>
            <h3 className="font-bold text-lg">Upload Information</h3>
            <p>Folder: {folder.name}</p>

            {folder.subfolders &&
                folder.subfolders.map((subfolder, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                        <h4>Subfolder: {subfolder.name}</h4>
                        {subfolder.images &&
                            subfolder.images.slice(0, 10).map((image, imgIndex) => (
                                <div key={imgIndex}>
                                    <img
                                        src={image.url}
                                        width={200}
                                        height={200}
                                        alt={`Image preview ${imgIndex}`}
                                    />
                                </div>
                            ))}
                    </div>
                ))}

            <button className="btn" onClick={onClose}>
                Close
            </button>
        </div>
    );
};

export default ModalUploadFile;
