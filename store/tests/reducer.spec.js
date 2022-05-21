import { stateKeys } from "../../types";
import { fetchTestsSucceeded } from "./actions";
import reducer, { selectTests } from "./reducer";

const defaultState = {
  error: { message: null, status: null },
  fetching: false,
  tests: [],
};
let state = {
  [stateKeys.TESTS]: {},
};

function updateState(action) {
  state = {
    [stateKeys.TESTS]: reducer(state.tests, action),
  };
}

describe("Test Tests actions, reducers and selectors", () => {
  beforeEach(() => {
    state = { [stateKeys.TEST]: { ...defaultState } };
  });
  it("can store and select what it stores ", () => {
    const tests = [
      {
        id: "459f88e6-1d55-4a54-92e8-dcd18599a104",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-18T06:58:01.7008091+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/sajxQyvwTmUntl8hZWKBBNJYAMe_bJFHP_r9h0BqBhluIjQBxTf7wQ.png",
      },
      {
        id: "eaa82ac0-320a-40a7-81cf-e0073406e1d0",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-18T10:34:38.2005436+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/-nci7YfEqYXbbCuzHca0na7PRP2SNwrjPTGG1l4euMVBCnN4gOjXvw.png",
      },
      {
        id: "c051cecb-39d6-42a1-a3d3-e283454a329d",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-18T10:34:41.0523399+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/SK4AZhbDVRT3nG039Oo8NxX7IcoM0a5GxKhRei0_Wv4TNKOJflwmPQ.png",
      },
      {
        id: "a77eaf33-1e94-432a-908f-c4d8ed2e7978",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-18T10:48:53.2326266+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/xWSaU3Rrdw3A15O4c1XMyKNfzxFyyKPlLX9q3G1RYYvGZ0APPJemdQ.png",
      },
      {
        id: "8376eab7-548f-4ab4-88a8-afe339053fe7",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-18T12:30:22.9752209+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/B0Wmt3UjGyekDfUyGaLk_-0rcNTGMcxcaUNfcFzGMqOLJJk1Jlkpzg.png",
      },
      {
        id: "b7d92cd6-a4cc-4555-ae02-ff3b18b4a38e",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-18T12:47:03.1878945+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/rlG6ZJVzxVpb5IE56a-K5GjbxzPd9EmGQeAsoUmnWRFeRfp0_Xi9LQ.png",
      },
      {
        id: "0e209baa-ceaf-4c13-96a6-05ee3dabb40c",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-18T12:47:23.3133026+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/lYn_ucaVPFYxdrG6-oNhSwRAosQ2Vu4bsJlkinNupKXgG0h1PTR1MA.png",
      },
      {
        id: "6f10df04-4585-406b-90fd-4df29637da66",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-19T12:31:47.2132525+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/pluAawfUBxuZN1V4k2gwXxsBxRE8uLvGHXa244qbySQUG5jXPTBSTA.png",
      },
      {
        id: "c6962815-f137-4f51-a5f8-6b2b2d5a024b",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-19T14:13:32.6719631+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/jwarpqL0tfQi55aBSBZcx5YCscg4TH8RvS-n5pNBp_Nd0RL_bshFUQ.png",
      },
      {
        id: "62a224ac-345d-4ac4-9f27-8a64f9caa3d4",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T06:42:40.3858911+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/2VpR-T5I61lVG71Wdz8NQ1uUMgXDwWHhOx89rbEmprnCZlHle07-3A.png",
      },
      {
        id: "36f0cf81-5b8d-4968-97a3-1da99c7e6971",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T09:09:21.1234275+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/wZxPecJXtnJfMMrB66RGrgMUMR0ajdZzIsr6q9mzI5-c16Jdhw9ZJQ.png",
      },
      {
        id: "3e5cc412-73b8-4cef-b4f7-87c64342151f",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T09:12:15.7179801+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/j-dJ5iLHGsEBOBDQAO6vJwMxDGarTlHNYDU47h5BvuqPlJavvl6fkQ.png",
      },
      {
        id: "d040230d-a3fb-4a29-af33-be95b0976c8b",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T09:12:27.8473133+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/Gnljw1rgaRVUIiI5RV6MdRPD3YpZ81zyB44hmYRsycjpNfJYhNmQHQ.png",
      },
      {
        id: "6b5afaf6-3a81-485c-9dce-2c75affd3491",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T09:13:04.0571484+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/ET-7eowfwcUPLbVRsXyycNMJSqeGKUzn4tOsA56xdLHy6hnV-1FJjg.png",
      },
      {
        id: "982a6b3d-d4e6-44fb-8224-9bd85a36e883",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T09:14:10.8261602+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/rJURnaI0vBm1G7PrbvrMdzzII-kQARySbfAx-PMYhrkWcFgOZS3kpw.png",
      },
      {
        id: "57911772-2f72-4506-8c26-f204881fad04",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T09:15:04.3897443+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/hrwDqs6N85_uVOuPHT0wZn0IotvBy1u-lQitkkfwMaNLk97V8dACbQ.png",
      },
      {
        id: "e5066b99-d2d6-44cb-b01f-593016d52134",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T09:16:41.0352245+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/ycQwegDJ8PXgTB9wrualoCfDBARcBds4KakDtw2gOhV4t1CI7I-kNQ.png",
      },
      {
        id: "5f7a9e2f-1354-427f-950f-268b82ce4dce",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T09:17:01.87156+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/j-XzxuirUaIl7kaexxO3iIqqzo2vkjEbt5KTea9w5Xdy0_9mvRdSRA.png",
      },
      {
        id: "0d181628-e810-4ad5-b4a3-1b7cc8751c76",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T09:17:08.542707+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/Tlsj_C3jCIk5vKlZLsPMqRQ8ZtsMDTgOkQlU2JFd0rKCQyR4fWmH3w.png",
      },
      {
        id: "8be0e770-7ea2-455a-945a-83a0d1eeb05d",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T09:37:37.6353641+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/__Z2VEZP-VDE_DyxFuRU-xjmgHkGp12fIdeBtYcVHto1eaaYvd1FIg.png",
      },
      {
        id: "4a701e50-30d6-4f2a-bda4-730d896340f3",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-23T11:00:17.492263+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/7y3ssaxbBUOxmuBLth6TEQgHnZcR0-4MuvmY6qzRkAy-qMW9ZAcZBA.png",
      },
      {
        id: "7be3015d-813c-423b-871b-8e78f68b5b7e",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-25T14:22:23.8364198+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/S4vKRJa8Mxt26_ZBmy3e_B20t4pvdGxdKIaHuQYGo6VRJSZU19NUWw.png",
      },
      {
        id: "44c3e886-f089-4964-91db-1f2b864ad572",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-03-25T18:08:02.1109171+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/iEpsWeHeFhr_bK30Jkl3UKfSAcgdesS6U4A04IO9Mxbv1cp2KHgFGQ.png",
      },
      {
        id: "f9fa10d5-01d5-496b-add3-bc48a8a30e16",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-06-30T09:20:19.8327784+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/hGlTMaVM9bPR8JWeKLqD1K4H2Dci7wjP0keKov82FF3gO2m2MJzpQg.png",
      },
      {
        id: "69a776d9-4f73-455a-afec-c84f939e74bf",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-06-30T09:33:19.9833399+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/iZUhe_Cbz3pf4sgJ7NQGB1TDK4E_C0lWnMO8P0EI2UQVQVsF8m-d1w.png",
      },
      {
        id: "1f9db12a-44fd-4851-b1c4-20818ead034b",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-08-31T09:33:38.9885504+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/AWWyO4ZYddukoHQjVsEhupSeUxcodkxsHuiBxdTzI4el_axKnIhN1g.png",
      },
      {
        id: "1c9d1c90-8739-40cf-984c-5411741561ec",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-12-18T13:44:24.1756741+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/xqlnqFRLnUV6duuTCZ2Qa0z6TShhQrmzGNkMdPmwY67PDFhnbpUvjw.png",
      },
      {
        id: "3ceff052-2a42-4405-8c93-897b1a8f7ec9",
        userId: "hsjo@equinor.com",
        name: "Short test",
        dateTaken: "2020-12-18T13:57:55.2373477+00:00",
        audiogram:
          "https://heardevhfjmkdbuaotts.blob.core.windows.net/audiogram/7XsgF9FDREDQO0vonnPk4bb6LRjIFdWa9cSQ9R2Py7JwvYqhEkCFRA.png",
      },
    ];
    updateState(fetchTestsSucceeded(tests));
    expect(selectTests(state)).toEqual(tests);
  });
});
