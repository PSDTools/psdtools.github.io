// TODO(lishaduck): convert this to be named runtimeQuerySelector
function getElementByIdTyped<T extends HTMLElement>(
  id: string,
  type: new () => T,
): T | undefined {
  const element = document.querySelector(`#${id}`);

  if (element instanceof type) {
    return element;
  }

  return undefined;
}

export { getElementByIdTyped };
