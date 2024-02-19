import { Slider } from '@mui/material';

function Home() {
  return (
    <div className="flex gap-10">
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="text-yellow-600" />
    </div>
  );
}

export default Home;
