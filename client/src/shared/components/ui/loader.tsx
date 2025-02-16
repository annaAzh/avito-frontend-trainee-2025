import { FC } from 'react';

const Loader: FC = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <img src="/assets/icons/loader.gif" alt="loader" />
    </div>
  );
};

export { Loader };
