async function setDownloadZipLink(canvas) {
  // use a BlobWriter to store with a ZipWriter the zip into a Blob object
  const blobWriter = new zip.BlobWriter("application/zip");
  const writer = new zip.ZipWriter(blobWriter);

  // use a TextReader to read the String to add
  await writer.add("filename.txt", new zip.TextReader("test!"));

  await writer.add("out.png", new zip.Data64URIReader(canvas.elt.toDataURL()))
  await writer.add("dir/out2.png", new zip.Data64URIReader(canvas.elt.toDataURL()))

  // close the ZipReader
  await writer.close();

  // get the zip file as a Blob
  const blob = await blobWriter.getData();

  document.getElementById("download").href = window.URL.createObjectURL(blob);
}

function setup() {
  let canvas = createCanvas(400, 400);
  background(0);
  fill(255);
  textSize(99);
  text("11", 0, 200);

  setDownloadZipLink(canvas);
}
