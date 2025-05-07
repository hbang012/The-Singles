import ClientOne from '@/app/ui/interleaving/ClientOne';
import ServerOne from '@/app/ui/interleaving/ServerOne';

export default function Interleaving() {
  return (
    <main className="p-[30px]">
      <h2 className="text-[26px] font-bold">인터리빙 페이지</h2>
      <ClientOne>
        <ServerOne />
      </ClientOne>
    </main>
  );
}
