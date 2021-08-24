import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface Props {
  children: string;
}

const Markdown = ({ children }) => {
  return (
    <div className='overflow-y-auto'>
      <ReactMarkdown
        remarkPlugins={[gfm]}
        children={children}
        components={{
          ul: (props) => <ul className='markdown list-disc' {...props} />,
          h4: (props) => <h6 className='text-lg' {...props} />,
          h3: (props) => <h6 className='text-xl' {...props} />,
          h2: (props) => <h6 className='text-2xl' {...props} />,
          h1: (props) => <h6 className='text-3xl' {...props} />,
        }}
      ></ReactMarkdown>
    </div>
  );
};

export default Markdown;
