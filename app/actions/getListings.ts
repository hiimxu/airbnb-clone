import prisma from '~/app/libs/prismadb';

const getListings = async () => {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
};

export default getListings;
