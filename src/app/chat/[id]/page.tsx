import { Pagee } from "@/components/chat/page";


export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params;   
    return(
        <div>
            <Pagee id={id}/>
        </div>
    )
}
