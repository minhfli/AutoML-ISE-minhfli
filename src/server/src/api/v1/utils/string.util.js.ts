const randomString = (length: number) => {
    let result = ''
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

const getLabelAndFilePath = (path: string) => {
    const pathArray = path.split('/');

    if (pathArray.length < 2) {
        // Handle the case when the path is not in the expected format
        console.error('Invalid path format:', path);
        return { label: null, path: path };
    }

    const label = pathArray[1];
    const filePath = pathArray.slice(1).join('/');
    return { label, path: filePath };
};

const randomUID = () => {
    return randomString(8)
}

export { randomString, randomUID, getLabelAndFilePath }
