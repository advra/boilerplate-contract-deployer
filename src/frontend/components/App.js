import './App.css';

function App() {
  const [contractAddress, setContractAddress] = useState('');
  const [contractABI, setContractABI] = useState('');

  useEffect(() => {
    fetch('../contractsData/Address.json') // adjust the path as necessary
      .then(response => response.json())
      .then(data => {
        setAddress(data.someProperty); // Replace 'someProperty' with the actual property name
      })
      .catch(error => console.error('Error fetching JSON:', error));

    fetch('../contractsData/ABI.json') // adjust the path as necessary
      .then(response => response.json())
      .then(data => {
        setAddress(data.someProperty); // Replace 'someProperty' with the actual property name
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  return (
      <div className="App">
        <div className="App-header">Contract Deployer</div>
        <div>This is a minimal web example:</div>
        <div>AddressDeployment: {contractAddress} </div>
        <TextField>{contractABI}</TextField>
      </div>
  );
}

export default App;
