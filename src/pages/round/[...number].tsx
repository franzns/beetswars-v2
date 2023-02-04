/* eslint-disable */

// DONE: switch API v1 to TRPC
// TODO: remove unused vars
// TODO: handle router params type errors

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Wrap,
  Heading,
  Text,
  Box,
  Center,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGlobalContext } from "contexts/GlobalContext";
import { trpc } from "utils/trpc";

export default function Round() {
  const roundList = trpc.rounds.roundlist.useQuery(undefined, {
    refetchOnWindowFocus: false,
  }).data?.data ?? {
    rounds: [],
    latest: 0,
  };

  const { requestedRound, requestRound, display, setDisplay } = useGlobalContext();
  const router = useRouter();
  const number = (router.query.number as string[]) || [];
  const roundAsNumber = parseInt(requestedRound);
  const bribeData = trpc.bribes.list.useQuery({ round: roundAsNumber }).data?.bribefile;

  const bgCard = useColorModeValue("#D5E0EC", "#1C2635");

  useEffect(() => {
    // @ts-ignore
    if (!roundList.rounds.includes(number[0])) {
      requestRound(roundList.latest.toString());
      router.push("/round/" + requestedRound, undefined, { shallow: true });
    } else {
      // @ts-ignore
      requestRound(number[0]);
    }

    if (number[1]) {
      switch (number[1]) {
        case "table":
          setDisplay("table");
          break;
        default:
          setDisplay("cards");
      }
    }
  }, [display, roundList, number]);

  console.log(roundList.latest);
  console.log(number[0], requestedRound);
  console.log(bribeData?.header);
  console.log(bribeData?.bribelist);

  return (
    <>
      <Box>
        <Center>
          <Text fontSize="4xl">{bribeData?.header.roundName}</Text>
        </Center>
        <Center>
          <Text fontSize="1.4rem">
            Vote Start: {bribeData?.header.voteStart} - Vote End: {bribeData?.header.voteEnd} -{" "}
            {bribeData?.header.timeRemaining}
          </Text>
        </Center>
        <Center>
          <Text fontSize="1.4rem">
            Votes Total: {bribeData?.header.totalVotes.toLocaleString("en-us")} - on incentivized
            Pools: {bribeData?.header.bribedVotes.toLocaleString("en-us")} - Total Voter:{" "}
            {bribeData?.header.totalVoter} - Bribed Voter: {bribeData?.header.bribedVoter}
          </Text>
        </Center>
        <Center>
          <Text fontSize="1.4rem">
            Total Incentives: {bribeData?.header.totalBribes.toLocaleString("en-us")} - avg/1kfB:{" "}
            {bribeData?.header.avgPer1000}{" "}
          </Text>
        </Center>
      </Box>

      {display === "cards" ? (
        <Center>
          <Wrap justify="center" padding="23px" margin="23px" spacing="50px">
            {bribeData?.bribelist?.map((bribe: any, i: number) => (
              <Box
                key={i}
                padding="23px"
                border="1px"
                margin="73px"
                width="280px"
                borderRadius="23px"
                backgroundColor={bgCard}
              >
                <Box>
                  <Box>
                    <Link href={bribe.poolurl}>
                      <Heading size="lg">{bribe.poolname}</Heading>
                    </Link>
                  </Box>
                  <Divider height="1px" bg="red" margin="9px 0px 9px 0px" />
                  <Box>
                    <Text fontSize="1.2rem">{bribe.rewarddescription}</Text>
                    <Text as="i" fontSize="1.1rem">
                      {bribe.assumption}
                    </Text>
                  </Box>
                  <Divider height="1px" bg="red" margin="9px 0px 9px 0px" />
                  <Box>
                    <Text>{bribe.label}:</Text>
                    <Text as="b" fontSize="1.2rem">
                      ${bribe.rewardAmount.toLocaleString("en-us")}
                    </Text>
                    <Text>Vote Total:</Text>
                    <Text as="b" fontSize="1.2rem">
                      {bribe.percent} % - [{bribe.votes.toLocaleString("en-us")}]
                    </Text>
                    <Text>$/1000fBeets:</Text>
                    <Center>
                      <Text as="b" fontSize="1.4rem">
                        {bribe.usdPer1000Vp.toLocaleString("en-us")}
                      </Text>
                    </Center>
                  </Box>
                </Box>
              </Box>
            ))}
          </Wrap>
        </Center>
      ) : (
        <Center>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th isNumeric>voteindex</Th>
                  <Th>poolname</Th>
                  <Th>description</Th>
                  <Th>Link</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bribeData?.bribelist.map((bribe: any, i: number) => (
                  <Tr key={i}>
                    <Td isNumeric> {bribe.voteindex}</Td>
                    <Td>{bribe.poolname}</Td>
                    <Td>{bribe.rewarddescription}</Td>
                    <Td>
                      <Link href={bribe.poolurl}>link</Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Center>
      )}
    </>
  );
}
