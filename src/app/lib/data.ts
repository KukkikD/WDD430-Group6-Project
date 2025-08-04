import prisma from './prisma';

export async function fetchProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    console.error('❌ Failed to fetch product by ID:', error);
    return null;
  }
}
