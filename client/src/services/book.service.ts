import { del, get, patch, post } from "libs/axios";

const INTENTION_CATEGORIES_ENDPOINT = "/intention_categories";

export interface IntentionCategoryDto {
  name: string;
  image: string;
}

export const createBook = async (
  payload: IntentionCategoryDto
) => {
  return await post(`${INTENTION_CATEGORIES_ENDPOINT}`, payload);
};

export const getBooks = async () => {
  return await get(`${INTENTION_CATEGORIES_ENDPOINT}`);
};

export const updateBook = async ({
  intentionCategoryId,
  payload,
}: {
  intentionCategoryId: string;
  payload: Partial<IntentionCategoryDto>;
}) => {
  return await patch(
    `${INTENTION_CATEGORIES_ENDPOINT}/${intentionCategoryId}`,
    payload
  );
};

export const deleteBook = async ({
  intentionCategoryId,
}: {
  intentionCategoryId: string;
}) => {
  return await del(`${INTENTION_CATEGORIES_ENDPOINT}/${intentionCategoryId}`);
};
