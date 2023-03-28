export enum UploadFileMIMETypes {
  MEDIA = 'image/*',
}

export const uploadFile = (
  type: UploadFileMIMETypes,
  onInput: (e: Event) => void
) => {
  const fileInput = document.createElement('input');

  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('accept', type);
  fileInput.style.display = 'none';
  const inputEventListener = (e: Event) => {
    onInput(e);
    (e.target as HTMLElement).remove();
  };
  fileInput.addEventListener('input', inputEventListener, { once: true });
  document.body.append(fileInput);
  fileInput.click();
};
