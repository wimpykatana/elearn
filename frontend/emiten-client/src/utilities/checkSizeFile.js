export function checkSizeFile (file) {
    const fs = {};
    const stats = fs.stat(file);
    const fileSizeInBytes = stats.size;

    return fileSizeInBytes;
}

