import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { ColorModeSwitcher } from "components/ColorModeSwitcher";
import { CustomConnectButton } from "components/CustomConnectButton";
import { useGlobalContext } from "contexts/GlobalContext";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { useEffect } from "react";
import { CgCardSpades as CardIcon } from "react-icons/cg";
import { ImStatsBars as StatsIcon, ImTable as TableIcon } from "react-icons/im";
import { trpc } from "../utils/trpc";
import { RoundSelector } from "components/RoundSelector";

export const TopRow = () => {
  const { requestedRound, requestRound, display, setDisplay } =
    useGlobalContext();
  const cardLink = "/round/" + requestedRound + "/cards";
  const tableLink = "/round/" + requestedRound + "/table";
  const router = useRouter();

  const iconProps = {
    size: "1.6rem",
    marginRight: "1rem",
  };

  const changeRound = (e: any) => {
    console.log(e.target.value);
    requestRound(e.target.value);
    router.push("/round/" + e.target.value);
  };

  return (
    <>
      <HStack p={4} justifyContent="flex-end">
        <Box style={{ marginRight: "1rem" }}>
          <Link href="/bribeform">
            <Text fontSize="1xl">bribeform</Text>
          </Link>
        </Box>
        <Box style={{ marginRight: "1rem" }}>
          <RoundSelector handleChange={changeRound} />
        </Box>
        <Link href="/chart">
          <Icon
            as={StatsIcon}
            height={iconProps.size}
            width={iconProps.size}
            marginRight={iconProps.marginRight}
          />
        </Link>
        <Link href={cardLink}>
          <Icon
            as={CardIcon}
            height={iconProps.size}
            width={iconProps.size}
            marginRight={iconProps.marginRight}
            color={display === "cards" ? "limegreen" : ""}
          />
        </Link>
        <Link href={tableLink}>
          <Icon
            as={TableIcon}
            height={iconProps.size}
            width={iconProps.size}
            marginRight={iconProps.marginRight}
            color={display === "table" ? "limegreen" : ""}
          />
        </Link>
        <CustomConnectButton />
        <ColorModeSwitcher />
      </HStack>
    </>
  );
};

export default TopRow;
