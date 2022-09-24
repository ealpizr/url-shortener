import { prisma } from "@lib/prisma";
import { NotFoundError } from "@prisma/client/runtime";
import { GetServerSideProps } from "next";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import Error from "next/error";

type StatusCode = 404 | 500;

interface Props {
  statusCode: StatusCode;
}

interface Params extends NextParsedUrlQuery {
  slug: string;
}

const SlugPage = ({ statusCode }: Props) => {
  return <Error statusCode={statusCode} />;
};

const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  console.log("params");
  console.log(context.params);
  console.log("");
  console.log("query");
  console.log(context.query);
  console.log("");

  try {
    const slug = context.params!.slug;
    const record = await prisma.uRL.findFirstOrThrow({
      where: { slug },
    });
    return {
      redirect: {
        destination: record.url,
        permanent: true,
      },
    };
  } catch (e) {
    console.log("eror caught");
    console.log(e);
    let statusCode: StatusCode = 404;
    if (e instanceof NotFoundError === false) {
      statusCode = 500;
      console.error(e);
    }
    return {
      props: {
        statusCode,
      },
    };
  }
};

export default SlugPage;
export { getServerSideProps };
