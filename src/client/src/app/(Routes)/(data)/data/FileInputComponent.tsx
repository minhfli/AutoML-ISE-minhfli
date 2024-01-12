import React, { useState } from 'react';

function FileInputComponent() {
    const [previewSrc, setPreviewSrc] = useState('');
    const [eventLog, setEventLog] = useState('');

    const handleEvent = (event: ProgressEvent<FileReader>) => {
        setEventLog((prevLog) => `${prevLog}${event.type}: ${event.loaded} bytes transferred\n`);
    };

    const handleFileChange = (event: { target: { files: any[]; }; }) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            // Attach event listeners to FileReader
            reader.onloadstart = (event) => handleEvent(event);
            reader.onload = (event) => {
                handleEvent(event);
                // @ts-ignore
                setPreviewSrc(reader.result);
            };
            reader.onloadend = (event) => handleEvent(event);
            reader.onprogress = (event) => handleEvent(event);
            reader.onerror = (event) => handleEvent(event);
            reader.onabort = (event) => handleEvent(event);

            // Begin reading the file
            reader.readAsDataURL(file);
            setEventLog(''); // Reset event log
        }
    };

    // @ts-ignore
    return (
        <div className="example">
            <div className="file-select">
                <label htmlFor="avatar">Choose a profile picture:</label>
                <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    // @ts-ignore
                    onChange={handleFileChange} />
            </div>

            {previewSrc && <img src={previewSrc} className="preview" height="200" alt="Image preview" />}

            <div className="event-log">
                <label htmlFor="eventLog">Event log:</label>
                <textarea readOnly className="event-log-contents" id="eventLog" value={eventLog}></textarea>
            </div>
        </div>
    );
}

export default FileInputComponent;
