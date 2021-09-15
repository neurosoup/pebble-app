import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface Props {
  children: string;
}

const Markdown = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      children={children}
      components={{
        ul: ({ ordered, node, ...props }) => {
          return <ul className='markdown list-disc' {...props} />;
        },
        h4: (props) => <h6 className='text-lg' {...props} />,
        h3: (props) => <h6 className='text-xl' {...props} />,
        h2: (props) => <h6 className='text-2xl' {...props} />,
        h1: (props) => <h6 className='text-3xl' {...props} />,
      }}
    ></ReactMarkdown>
  );
};

export default Markdown;
