import { useState, useRef, RefObject, useEffect } from 'react';
import { clsx } from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

interface Props {
  url: string;
  className?: string;
  parentRef?: RefObject<HTMLDivElement>;
}

export const SocialShare: React.FC<Props> = ({ url, className, parentRef }) => {
  const [hidden, setHidden] = useState(false);
  const currentRef = useRef<HTMLDivElement>(null);
  const elementHeight = useRef(0);

  useEffect(() => {
    if (!currentRef.current) {
      return;
    }
    elementHeight.current = currentRef.current.getBoundingClientRect().height;
  }, [currentRef]);

  useEffect(() => {
    const handleScroll = (): void => {
      if (!parentRef?.current) {
        return;
      }
      const positionParent = parentRef.current.getBoundingClientRect();

      const shouldHide = window.scrollY > positionParent.height - elementHeight.current - 20;

      setHidden(shouldHide);
    };

    window.addEventListener('scroll', handleScroll);

    return (): void => window.removeEventListener('scroll', handleScroll);
  }, [hidden, parentRef]);

  const message = `See my blog post at: `;

  return (
    <div
      ref={currentRef}
      className={clsx(
        'bottom-0 md:bottom-auto md:top-[76px] lg:top-[92px] fixed md:sticky md:rounded-b-lg bg-main-500 w-full text-center text-white p-2 lg:p-4 transition duration-300 ease-in-out',
        className,
        { 'z-0 opacity-0': hidden },
        { 'z-20 opacity-100': !hidden }
      )}
    >
      <h4 className="hidden md:block text-sm text-light mb-4">Share</h4>
      <div className="flex justify-around">
        <div>
          <a
            href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FontAwesomeIcon
              className="transform hover:scale-110 transition duration-100 ease-in-out hover:text-gray-100"
              icon={faFacebook}
              size="2x"
            />
          </a>
        </div>
        <div>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              url
            )}&title=${encodeURIComponent(message)}&summary=${encodeURIComponent(message)}&source=${encodeURIComponent(
              url
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Linkedin"
          >
            <FontAwesomeIcon
              className="transform hover:scale-110 transition duration-300 ease-in-out hover:text-gray-100"
              icon={faLinkedin}
              size="2x"
            />
          </a>
        </div>
        <div>
          <a
            href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(message)}&url=${encodeURIComponent(
              url
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FontAwesomeIcon
              className="transform hover:scale-110 transition duration-300 ease-in-out hover:text-gray-100"
              icon={faTwitter}
              size="2x"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
