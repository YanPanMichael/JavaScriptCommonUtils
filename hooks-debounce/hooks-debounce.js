import React from 'react';
import _ from 'lodash';

const MyComponent = (props) => {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (reload) {
      /* Call API here */
    }
  }, [reload]);

  const callApi = () => {
    setReload(true);
  }; // You might be able to call API directly here, I haven't tried
  const [debouncedCallApi] = useState(() => _.debounce(callApi, 1000));

  function handleChange() {
    debouncedCallApi();
  }

  return (
    <>
      <input onChange={handleChange} />
    </>
  );
};

const Form: React.FC<Props> = (props) => {
  const [selectedStorageSize, setSelectedStorageSize] = React.useState(
    props.storageSize,
  );

  const handleChangeAt = (field, payload) => {
    props.handleFormChangeAt(FormField.InstanceDefs, {
      ...form[FormField.InstanceDefs],
      [field]: payload,
    });
  };

  const debouncedChange = _.debounce(
    (field, payload) => handleChangeAt(field, payload),
    500,
  );

  return (
    <input
      required
      type="range"
      label="Storage Size/GB"
      min={50}
      max={500}
      value={props.selectedStorageSize}
      step={5}
      onChange={(e) => {
        setSelectedStorageSize(Number(e.target.value));
        debouncedChange(FormField.StorageSize, Number(e.target.value));
      }}
    />
  );
};
