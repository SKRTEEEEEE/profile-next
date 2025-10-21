import { getTranslations } from 'next-intl/server';
import { creatorData } from '@/lib/data';

export type Web3I18 = {
    id: number
    h2: string
    desc: string
    list: string[]
    instructions: string[]
}

export type Web3Stat = {
    id: number
    path: string
    contract: string
}

const web3Static: Web3Stat[] = [{
    id: 1,
    path: "/nft-raffle",
    contract: `${creatorData.githubUrl}/trySolidity24/blob/main/markdown/contratos_desplegados.md`
}, {
    id: 2,
    path: "/nft-membership",
    contract: `${creatorData.githubUrl}/trySolidity24/blob/main/markdown/contratos_desplegados.md`
}, {
    id: 3,
    path: "/counter",
    contract: `${creatorData.githubUrl}/trySolidity24/blob/main/markdown/contratos_desplegados.md`
}]

async function getWeb3(): Promise<(Web3I18 & Web3Stat)[]> {
    const t = await getTranslations()

    const localeWeb3: Web3I18[] = t.raw("ceo.code.slider")
    const mWeb3 = localeWeb3.map((locale: Web3I18) => {
        const web3base = web3Static.find(web3st => web3st.id === locale.id)
        if (!web3base) throw new Error("Not found static info")
        const { path, contract } = web3base
        return {
            ...locale,
            path,
            contract
        }
    })
    return mWeb3
}

const Web3Page = async () => {
    const web3page = await getWeb3()
    const t = await getTranslations()

    return (
        <main>
            <div className='flex flex-col justify-center min-h-dvh px-8'>
                <h1 tabIndex={0} className="text-2xl leading-tight text-center md:text-4xl md:mb-5">
                    {t("ceo.code.h1.0")}
                    <span className="block font-bold text-secondary-ceo"> {t("ceo.code.h1.1")}
                    </span>
                </h1>
                
                {/* Simple list view instead of Swiper */}
                <div className="mt-8 space-y-6 max-w-4xl mx-auto">
                    {web3page.map(({ id, h2, desc, list, path, contract }) => (
                        <article key={id} className='flex flex-col p-6 border border-primary-ceo-200 rounded-lg bg-primary-ceo-900/20'>
                            <h2 tabIndex={0} className='text-center text-3xl text-primary-ceo font-semibold mb-4'>{h2}</h2>
                            <div className="mt-2 text-center mb-4">
                                {desc}
                            </div>
                            <section className="mb-4">
                                <fieldset>
                                    <legend className='text-primary-200 font-semibold mb-2'>{t("ceo.code.slider_list_tittle")}</legend>
                                    <ul className="space-y-1">
                                        {list.map((uso, index) => (
                                            <li className='text-xs border-primary-ceo-200/10 border-b-2 rounded-sm px-2 py-1' key={index}>{uso}</li>
                                        ))}
                                    </ul>
                                </fieldset>
                            </section>

                            <div className="flex justify-between gap-5">
                                <a
                                    href={`https://ejemplos-d-apps.vercel.app${path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 transition duration-150 rounded-lg bg-secondary-ceo hover:bg-secondary-ceo/80 text-center flex-1"
                                >
                                    {t.raw("ceo.code.buttons").example}
                                </a>
                                <a
                                    href={contract}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 transition duration-150 rounded-lg bg-slate-500 hover:bg-slate-500/80 text-center flex-1"
                                >
                                    <span className='hidden lg:inline'>{t.raw("ceo.code.buttons").code[0]} </span>{t.raw("ceo.code.buttons").code[1]}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Web3Page;
