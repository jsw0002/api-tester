import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [values, setValues] = useState({
    key: 1,
    url: '',
    results: undefined,
    badInput: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [urlList, setUrlList] = useState([]);

  const handleUrlInputChange = (event) => {
    setValues((values) => ({
      ...values,
      url: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('url to be hit: ', values.url);
    const instance = axios.create();
    try {
      const { data } = await instance({
        url: values.url,
        method: 'GET',
      });
      console.log('response: ', data);
      urlList.push({ key: values.key, url: values.url });
      console.log('url list: ', urlList);
      const newKey = values.key + 1;
      setValues({
        key: newKey,
        url: '',
        results: data,
        badInput: false,
      });
      setSubmitted(true);
    } catch (error) {
      setValues({ url: '', badInput: true });
      console.log('An error occurred');
    }
  };

  return (
    <div className='App'>
      <h1>API URL Tester</h1>
      <h5>Urls that have been tested</h5>
      <ul>
        {urlList.map((object) => <li key={object.key}>{object.url}</li>)}
      </ul>
      <div>
        List of free api urls <a href='https://apipheny.io/free-api/' target='_blank'>found here</a>.
      </div>
      <form className='api-form' onSubmit={handleSubmit}>
        <input 
          id='url-input'
          type='text'
          placeholder='Put url here'
          value={values.url}
          onChange={handleUrlInputChange}
        />
        <button type='submit'>Check Values</button>
        {values.badInput && <span className='input-error'>Please try another input.</span>}
      </form>
      <div>
        {submitted && <pre><code>{JSON.stringify(values.results, null, 2)}</code></pre>}
      </div>
    </div>
  );
}

export default App;
