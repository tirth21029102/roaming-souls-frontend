export const handlePasswordInput = (e, hideTimeoutRef, setShowPassword) => {
  const inputType = e.nativeEvent.inputType;

  // Ignore deletes, backspace, paste, autofill
  if (
    inputType === 'deleteContentBackward' ||
    inputType === 'deleteContentForward' ||
    inputType === 'insertFromPaste' ||
    inputType === 'insertFromDrop' ||
    inputType === 'insertReplacementText'
  ) {
    return;
  }

  // Clear previous timeout
  if (hideTimeoutRef.current) {
    clearTimeout(hideTimeoutRef.current);
  }

  // Show last typed character
  setShowPassword(true);

  hideTimeoutRef.current = setTimeout(() => {
    setShowPassword(false);
  }, 250); // feels very natural
};
