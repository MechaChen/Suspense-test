import { useState, Suspense, lazy } from 'react';

import Loading from './Loading';

const MarkdownPreview = lazy(() => delayForDemo(import('./MarkdownPreview.js')));


async function delayForDemo (promise) {
  const delay = new Promise((resolve) => setTimeout(resolve, 2000))
  await delay;
  return promise;
}

const MarkdownEditor = function MarkdownEditor() {
  const [showPreview, setShowPreview] = useState(false);
  const [markdown, setMarkdown] = useState('Hello, **world**!');
  return (
      <>
          <textarea value={markdown} onChange={e => setMarkdown(e.target.value)} />
          <label>
              <input type="checkbox" checked={showPreview} onChange={e => setShowPreview(e.target.checked)} />
              Show preview
          </label>
          <hr />
          {showPreview && (
              <Suspense fallback={<Loading />}>
                  <h2>Preview</h2>
                  <MarkdownPreview markdown={markdown} />
              </Suspense>
          )}
      </>
  );
}

export default MarkdownEditor;

