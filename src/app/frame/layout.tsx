import Sidebar from '@/components/SideBar';

const WorkspaceLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='__layout h-full'>
      <div className='flex h-full'>
        <Sidebar />
        <section className='flex-1'>{children}</section>
      </div>
    </div>
  );
};

export default WorkspaceLayout;
