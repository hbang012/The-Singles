import { resolve } from 'path';

export default async function Blog() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <main className="p-[30px]">
      <h2 className="font-bold text-[26px]">my bolg</h2>
    </main>
  );
}
