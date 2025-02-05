import { relativeToAbsoluteUrls } from '@/utils/relativeToAbsoluteUrls';

interface CallToActionButtonProps {
  content: string;
  url: string;
}

const CallToActionButton = ({ content, url }: CallToActionButtonProps) => {
  const baseClass =
    'bg-pink-700 my-[30px] rounded-md mx-auto p-[10px] flex justify-center w-full max-w-[400px] trasform transition duration-400 ease-in-out hover:scale-[1.01]';

  return (
    <a href={relativeToAbsoluteUrls(url)} className={`${baseClass} flex `}>
      {content}
    </a>
  );
};

export default CallToActionButton;
