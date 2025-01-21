// Si cada pagina de doc con sus distintos segmentos renderiza distinto, entonces envez de crear docs/page.tsx debemos crear
// una carpeta con doble bracket /app/docs/[[...slug]]/page.tsx y ahi manejar los distintos estilos.
// docs/page.tsx no debe existir si se usa /app/docs/[[...slug]]/page.tsx
export default async function docsPage({params,}: { params: Promise<{slug: string[]}> }) {
  const { slug } = await params;
  if (slug?.length === 2) {
    return <div>Docs Page with 2 segments: {slug.join('/')}</div>;
  } else if (slug?.length === 1) {
    return <div>Docs Page with 1 segment: {slug[0]}</div>;
  }
  return <div>Docs Page with no segment</div>;
}