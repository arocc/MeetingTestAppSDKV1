import * as React from 'react';

// import { noHostSdkMsg } from '../../App';
import { ApiContainer } from './ApiContainer';
import { isTestBackCompat } from './isTestBackCompat';


export const ApiWithoutInput = (props) => {
  const { name, onClick, title } = props;
  const [result, setResult] = React.useState('');
  const onClickCallback = React.useCallback(async () => {
    setResult("noHostSdkMsg");
    try {
      if (typeof onClick === 'function') {
        setResult(await onClick(setResult));
      } else {
        if (isTestBackCompat()) {
          onClick.withCallback(setResult);
        } else {
          setResult(await onClick.withPromise(setResult));
        }
      }
    } catch (err) {
      setResult('Error: ' + err);
    }
  }, [setResult, onClick]);
  return (
    <ApiContainer title={title} result={result} name={name}>
      <input name={`button_${name}`} type="button" value={title} onClick={onClickCallback} />
    </ApiContainer>
  );
};
